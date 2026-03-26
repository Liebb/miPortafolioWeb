import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { GitHubRepo, GitHubCacheEntry } from '../models/github-repo.model';

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private http = inject(HttpClient);

  private readonly GITHUB_USERNAME = 'Liebb';
  private readonly API_URL = `https://api.github.com/users/${this.GITHUB_USERNAME}/repos`;
  private readonly CACHE_KEY = 'github_repos_cache';
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

  // Signals
  readonly repos = signal<GitHubRepo[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly rateLimited = signal<boolean>(false);

  readonly filteredRepos = computed(() =>
    this.repos()
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
  );

  loadRepos(): void {
    // Try cache first
    const cached = this.getFromCache();
    if (cached) {
      this.repos.set(cached);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<GitHubRepo[]>(this.API_URL, {
        params: {
          sort: 'updated',
          per_page: '30',
          type: 'owner',
        },
      })
      .pipe(
        tap((data) => {
          this.saveToCache(data);
          this.repos.set(data);
          this.loading.set(false);
        }),
        catchError((err: HttpErrorResponse) => {
          this.loading.set(false);

          if (err.status === 403) {
            this.rateLimited.set(true);
            this.error.set(
              'Se alcanzó el límite de solicitudes a GitHub. Mostrando datos en caché.'
            );
            // Try to show stale cache
            const stale = this.getFromCache(true);
            if (stale) {
              this.repos.set(stale);
            }
          } else {
            this.error.set(
              'No se pudieron cargar los repositorios. Intenta de nuevo más tarde.'
            );
          }

          return of([]);
        })
      )
      .subscribe();
  }

  private saveToCache(data: GitHubRepo[]): void {
    try {
      const entry: GitHubCacheEntry = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.CACHE_TTL,
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(entry));
    } catch {
      // localStorage might be full or unavailable
    }
  }

  private getFromCache(ignoreExpiry = false): GitHubRepo[] | null {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      if (!raw) return null;

      const entry: GitHubCacheEntry = JSON.parse(raw);

      if (!ignoreExpiry && Date.now() > entry.expiresAt) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }
}

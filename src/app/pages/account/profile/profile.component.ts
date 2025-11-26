import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserProfile } from './user.selectors';
import * as UserActions from './user.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  template: `
    <div class="bg-gray-100 p-4 sm:p-8 flex justify-center">
      @if (userProfile$ | async; as profile) {
      <div class="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <!-- Avatar Placeholder -->
          <div
            class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0"
          >
            <span class="text-4xl sm:text-5xl font-bold">{{
              profile.fullName ? profile.fullName[0] : 'U'
            }}</span>
          </div>

          <!-- User Info -->
          <div class="text-center sm:text-left">
            <h1 class="text-3xl font-bold text-gray-800">{{ profile.fullName }}</h1>
            <p class="text-gray-500 mt-1">{{ '@' }}{{ profile.username }}</p>
          </div>
        </div>

        <!-- Account Details -->
        <div class="mt-8 border-t border-gray-200 pt-8">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Détails du compte</h2>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div class="flex flex-col">
              <dt class="text-sm font-medium text-gray-500">Adresse e-mail</dt>
              <dd class="text-gray-800">{{ profile.email }}</dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-sm font-medium text-gray-500">Abonnement Newsletter</dt>
              @if(profile.preferences) {
              <dd class="text-gray-800 mt-1">
                <label class="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    class="sr-only peer"
                    [ngModel]="profile.preferences.newsletter"
                    (ngModelChange)="updateNewsletterPreference($event)"
                  >
                  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900">{{ profile.preferences.newsletter ? 'Oui' : 'Non' }}</span>
                </label>
              </dd>
              }
            </div>
          </dl>
        </div>
      </div>
      }
    </div>
  `,
})
export class ProfileComponent {
  private store = inject(Store);
  userProfile$ = this.store.select(selectUserProfile);

  updateNewsletterPreference(newsletter: boolean) {
    this.store.dispatch(UserActions.updateUserProfile({ 
      profile: { preferences: { newsletter } } 
    }));
  }
}

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// Ces imports sont corrects car les fichiers sont dans le même dossier
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

// Ceci est la configuration pour la "feature" utilisateur
export const USER_FEATURE = {
  name: 'user', // Le nom de notre "slice" dans le store global
  reducer: userReducer,
};

// Ceci est un helper pour l'enregistrer dans les routes
export function provideUserFeature() {
  return [
    provideState(USER_FEATURE), 
    provideEffects([UserEffects])];
}
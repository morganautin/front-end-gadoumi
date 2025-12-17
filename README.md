# MyShop

MyShop est une application front-end développée avec **Angular** et **NgRx**.
Elle simule une boutique en ligne complète avec catalogue produits, panier,
favoris, authentification et tunnel de commande multi-étapes.

Ce projet est réalisé dans le cadre des TP front-end et met l’accent sur :
- l’expérience utilisateur (UX)
- la robustesse métier
- la gestion d’état avec NgRx
- la qualité logicielle (tests + CI)

---

## Fonctionnalités

### Catalogue produits
- Liste paginée des produits
- Filtres :
  - note minimale
  - tri (prix, note)
- Synchronisation des filtres et de la pagination dans l’URL (query params)
- Navigation Back / Forward restaurée automatiquement
- Skeleton loaders pendant le chargement
- États d’erreur clairs avec bouton **Réessayer**

### Panier & favoris
- Ajout / suppression de produits
- Mise à jour des quantités
- Calcul automatique des totaux
- Gestion des favoris
- État global géré via NgRx

### Authentification
- Connexion utilisateur
- Gestion des erreurs de login
- Stockage des tokens via NgRx
- Notifications globales en cas de succès ou d’échec

### Tunnel de commande (checkout)
- Étape 1 : résumé du panier
- Étape 2 : adresse de livraison
- Étape 3 : confirmation
- Garde-fous de navigation :
  - impossible d’accéder à une étape si la précédente n’est pas valide
  - panier vide bloqué
- Calculs métier détaillés :
  - sous-total
  - remise
  - livraison
  - taxes
  - total final

### Notifications globales
Des notifications utilisateur sont affichées dans les cas suivants :
- échec de connexion
- erreur de chargement des produits
- code promo invalide
- stock insuffisant lors de la validation
- succès / échec lors de la création d’une commande ou d’un avis

---

## Lancer le projet en local

### Serveur de développement

```bash
ng serve

http://localhost:4200/

Quality

Cette application est configurée pour respecter des standards de qualité
professionnels.

Lancer les tests unitaires
npm test


ou

ng test


Les tests couvrent notamment :

Reducers NgRx (logique métier pure)

Selectors (sélecteurs composés et mémoïsés)

Effects (success / failure)

Composants clés (émission d’événements, rendu)

Les tests n’appellent jamais un vrai backend (HTTP et store mockés).

Lancer le lint
npm run lint

CI GitHub Actions (Pull Request)

Une pipeline GitHub Actions est configurée.

À chaque Pull Request vers la branche main, la CI exécute automatiquement :

Installation des dépendances (npm ci)

Lint

Tests unitaires

Build de l’application

La Pull Request échoue automatiquement si :

le lint échoue

un test échoue

le build échoue

Build de production
ng build


Les fichiers compilés sont générés dans le dossier dist/.

Technologies utilisées

Angular

NgRx (Store, Effects, Selectors)

Angular Material

RxJS

GitHub Actions (CI)

TypeScript
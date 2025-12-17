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

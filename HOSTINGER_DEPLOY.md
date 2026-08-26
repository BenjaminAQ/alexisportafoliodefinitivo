# Despliegue en Hostinger — Portafolio de Alexis

## Archivos modificados para compatibilidad con Hostinger

### 1. `package.json`
- `start`: cambiado de `bun` a `node` (Hostinger no tiene Bun)
- `dev`: simplificado (sin `tee` ni pipes)
- `bun-types` eliminado de devDependencies

### 2. `.env`
- `DATABASE_URL`: cambiado de path absoluto (`/home/z/my-project/...`) a relativo (`./dev.db`)
- Credenciales Firebase `NEXT_PUBLIC_*` incluidas (públicas por diseño)

### 3. `.gitignore`
- `.env*` cambiado a `.env.local` y `.env.*.local` (`.env` ahora se incluye en el ZIP)

### 4. `src/lib/firebase.ts`
- Fallback con credenciales hardcodeadas (funciona sin .env)

### 5. `next.config.ts`
- `output: "standalone"` (genera servidor autocontenido)
- `alexispompilla.com` añadido a `allowedDevOrigins`

## Comandos de instalación, compilación e inicio

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar el proyecto (genera .next/standalone/)
npm run build

# 3. Iniciar el servidor en producción
npm run start
```

El servidor escuchará en `0.0.0.0` y usará `process.env.PORT` (o puerto 3000 por defecto).

## Configuración en Firebase Console (obligatorio)

### Autorizar dominio
Firebase Console → Authentication → Settings → Authorized domains → añadir:
- `alexispompilla.com`
- `www.alexispompilla.com` (si aplica)

### Publicar reglas de Firestore
Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /users/{uid} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.auth.uid == uid
        && request.resource.data.role == 'pending'
        && request.resource.data.uid == uid
        && request.resource.data.email == request.auth.token.email;
      allow update, delete: if isAdmin();
    }
    match /sections/{sectionId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Publicar reglas de Storage
Firebase Console → Storage → Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null
        && firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /images/{uid}/{fileName} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /files/{uid}/{fileName} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /uploads/{uid}/{fileName} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Darte acceso de admin
1. Entra a `https://alexispompilla.com/admin`
2. Inicia sesión con tu Gmail
3. Te aparecerá "pendiente de aprobación"
4. Ve a **Firebase Console → Firestore → users → [tu-uid]**
5. Cambia `role` de `"pending"` a `"admin"`
6. Vuelve a entrar a `/admin`

## Requisitos de Hostinger
- Plan con soporte **Node.js** (VPS o Shared con Node)
- Node.js versión 18 o superior (recomendado 20+)
- Acceso SSH o terminal para ejecutar comandos
- Puerto 3000 disponible (o configurar el que Hostinger asigne)

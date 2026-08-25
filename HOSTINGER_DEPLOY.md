# Instrucciones de despliegue para Hostinger

## Paso 1: Generar el ZIP
Desde el panel de Z.ai, genera un ZIP del proyecto completo.
El archivo `.env` con las credenciales de Firebase **ya está incluido** en el proyecto.

## Paso 2: Subir a Hostinger
1. Entra a tu panel de Hostinger → File Manager o Git
2. Sube el ZIP y descomprímelo en la carpeta pública
3. O conecta tu repositorio de Git si usas Git deployment

## Paso 3: Instalar dependencias y construir
En Hostinger, ejecuta estos comandos en la terminal (si tienes acceso SSH):
```bash
npm install
npm run build
npm run start
```

Si Hostinger usa Bun:
```bash
bun install
bun run build
bun run start
```

## Paso 4: Configurar el dominio en Firebase
**CRÍTICO**: Sin esto, el login con Google NO funcionará.

1. Ve a [Firebase Console](https://console.firebase.google.com) → tu proyecto `alexisportafolio-8d4a7`
2. **Authentication** → **Settings** (engranaje) → **Authorized domains**
3. Añade: `alexispompilla.com`
4. Añade: `www.alexispompilla.com` (si usas www)

## Paso 5: Publicar las reglas de Firestore y Storage

### Firestore Rules
Firebase Console → Firestore → Rules → pegar y Publicar:
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

### Storage Rules
Firebase Console → Storage → Rules → pegar y Publicar:
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

## Paso 6: Darte acceso de admin
1. Entra a `https://alexispompilla.com/admin`
2. Inicia sesión con tu Gmail
3. Te aparecerá "pendiente de aprobación"
4. Ve a **Firebase Console → Firestore → users → [tu-uid]**
5. Cambia `role` de `"pending"` a `"admin"`
6. Vuelve a entrar a `/admin` → ya puedes editar

## Notas importantes
- Las credenciales de Firebase están en el archivo `.env` (públicas por diseño)
- El archivo `.env.local` está excluido del ZIP (solo para desarrollo local)
- El fallback con credenciales hardcodeadas está en `src/lib/firebase.ts` por si las variables de entorno no se cargan
- El servidor debe correr en el puerto que Hostinger asigne (generalmente 3000)

# SSH Key

```shell
# VER LAS CLAVES
ls -la ~/.ssh
```

```shell
# GENERAR NUEVA CLAVE
# ed25519 no es el nombr e sino el algoritmo
ssh-keygen -t ed25519 -C "tu_correo@example.com"

```


```shell
# CONFIGURAR CLAVES
nano ~/.ssh/config

# Configuración para GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github

# Configuración para GitLab
Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/id_ed25519_gitlab


```

Entiendo que necesitas generar una nueva llave SSH para tu cuenta de GitLab asociada al repositorio de **Vitawallet**, asegurándote de que esta llave sea distinta de otra llave SSH que ya usas para otra cuenta de GitLab con un repositorio diferente. Además, quieres que la llave tenga una referencia al nombre "vitawallet" para diferenciarla, y necesitas un flujo completo, desde la generación hasta la comprobación de que ambas llaves funcionan para realizar operaciones como `pull` y `push`. Dado tu contexto (aplicación Rails en Docker, pruebas con Selenium, RubyMine, y optimizaciones como **jemalloc**), te proporcionaré una respuesta detallada siguiendo el formato solicitado, adaptada a tu nivel de experiencia como desarrollador Junior que aspira a alcanzar el nivel Mid.

---

### **NIVEL DE LA PREGUNTA: Junior**

**Explicación de por qué se considera de este nivel**:
Generar y configurar llaves SSH para GitLab requiere conocimientos básicos de Git, comandos de terminal, y conceptos de autenticación segura. Es una tarea común para desarrolladores Junior que están aprendiendo a gestionar repositorios remotos. Sin embargo, manejar múltiples llaves SSH para diferentes cuentas de GitLab añade una capa de complejidad intermedia, como configurar el archivo `~/.ssh/config`, lo que se alinea con tu objetivo de alcanzar el nivel Mid. No involucra temas avanzados como gestionar llaves en entornos de CI/CD o automatización compleja, que serían más propios de un nivel Senior.

---

### **EXPLICACIÓN Y JUSTIFICACIÓN DE LA RESPUESTA**

#### **Contexto: Llaves SSH en GitLab**
Las llaves SSH permiten autenticarte con GitLab sin necesidad de ingresar tu nombre de usuario y contraseña en cada operación Git (`clone`, `pull`, `push`). Una llave SSH consta de:
- **Llave privada**: Se almacena en tu máquina y debe protegerse.
- **Llave pública**: Se registra en GitLab y se asocia a tu cuenta.

Tu caso requiere:
1. Generar una nueva llave SSH con una referencia a "vitawallet" (por ejemplo, nombrarla `id_ed25519_vitawallet`) para tu cuenta de GitLab asociada al repositorio de Vitawallet.
2. Configurar el archivo `~/.ssh/config` para asociar cada llave SSH con la cuenta y repositorio correctos, evitando conflictos con tu otra llave SSH (que llamaremos `id_ed25519_other` para el otro repositorio).
3. Asegurar que ambas llaves funcionen para realizar operaciones Git en sus respectivos repositorios.
4. Comprobar que todo está configurado correctamente.

#### **Por qué necesitamos un archivo `~/.ssh/config`**
Cuando tienes múltiples llaves SSH, GitLab no sabe automáticamente cuál usar para cada repositorio. El archivo `~/.ssh/config` permite especificar qué llave privada usar para cada host (por ejemplo, `gitlab.com` para Vitawallet y otro host o alias para el otro repositorio). Usaremos alias de host para diferenciar las conexiones y asociarlas a las llaves correctas.

#### **Flujo general**
1. Generar una nueva llave SSH para Vitawallet.
2. Añadir la llave pública a tu cuenta de GitLab para Vitawallet.
3. Configurar el archivo `~/.ssh/config` para manejar ambas llaves.
4. Añadir la llave privada al agente SSH (`ssh-agent`).
5. Configurar el repositorio local de Vitawallet para usar la URL SSH correcta.
6. Comprobar que puedes realizar `pull` y `push` en el repositorio de Vitawallet.
7. Verificar que la otra llave SSH sigue funcionando para el otro repositorio.

#### **Asunciones**
- Estás usando un sistema basado en Unix (Linux, macOS, o WSL en Windows), ya que mencionaste Docker y **jemalloc**.
- Tienes Git instalado y acceso a la terminal.
- Tus cuentas de GitLab son:
  - **Cuenta A**: Para el repositorio de Vitawallet (por ejemplo, `user_vitawallet@gitlab.com`).
  - **Cuenta B**: Para el otro repositorio (por ejemplo, `user_other@gitlab.com`).
- Los repositorios son:
  - **Repositorio Vitawallet**: `git@gitlab.com:user_vitawallet/vitawallet.git`.
  - **Otro repositorio**: `git@gitlab.com:user_other/other_repo.git`.
- Si usas Windows, trabajarás en Git Bash o WSL para los comandos SSH.

#### **Justificación**
La solución usa el algoritmo `ed25519` (recomendado por GitLab por ser más seguro y compacto que RSA) y nombra las llaves de forma descriptiva (`id_ed25519_vitawallet` y `id_ed25519_other`) para evitar confusión. El archivo `~/.ssh/config` garantiza que cada llave se use solo para la cuenta y repositorio correctos. La comprobación final asegura que ambas llaves funcionan, integrándose con tu entorno Dockerizado (para ejecutar comandos Git) y RubyMine (para depuración).

---

### **SOLUCIÓN: Código**

A continuación, te detallo cada paso del flujo, incluyendo comandos, configuraciones, y comprobaciones.

#### **Paso 1: Generar una nueva llave SSH para Vitawallet**
1. **Abrir la terminal**:
   - En Linux/macOS: Usa la terminal nativa.
   - En Windows: Usa Git Bash o WSL (recomendado, dado tu uso de Docker).

2. **Generar la llave SSH**:
   ```bash
   ssh-keygen -t ed25519 -C "vitawallet@your_email.com" -f ~/.ssh/id_ed25519_vitawallet
   ```
   - **Explicación**:
     - `-t ed25519`: Usa el algoritmo `ed25519` (seguro y recomendado por GitLab).
     - `-C "vitawallet@your_email.com"`: Añade un comentario para identificar la llave (usa el correo asociado a tu cuenta de GitLab para Vitawallet).
     - `-f ~/.ssh/id_ed25519_vitawallet`: Especifica el nombre del archivo para la llave (`id_ed25519_vitawallet` para la privada, `id_ed25519_vitawallet.pub` para la pública).
   - **Prompts**:
     - **Archivo**: Se autocompleta con `~/.ssh/id_ed25519_vitawallet` (presiona Enter).
     - **Passphrase**: Por simplicidad, presiona Enter para no usar passphrase (si usas una, deberás ingresarla en cada operación Git, a menos que uses `ssh-agent` con `keychain`).
   - **Resultado**:
     - Se generan dos archivos en `~/.ssh/`:
       - `id_ed25519_vitawallet`: Llave privada.
       - `id_ed25519_vitawallet.pub`: Llave pública.

3. **Verificar los archivos**:
   ```bash
   ls ~/.ssh/
   ```
   - Deberías ver `id_ed25519_vitawallet` y `id_ed25519_vitawallet.pub` (y probablemente los archivos de tu otra llave, como `id_ed25519_other` y `id_ed25519_other.pub`).

4. **Proteger los permisos**:
   ```bash
   chmod 600 ~/.ssh/id_ed25519_vitawallet
   chmod 644 ~/.ssh/id_ed25519_vitawallet.pub
   ```
   - Esto asegura que la llave privada sea legible solo por ti y la pública sea accesible.

#### **Paso 2: Añadir la llave pública a tu cuenta de GitLab (Vitawallet)**
1. **Copiar la llave pública**:
   ```bash
   cat ~/.ssh/id_ed25519_vitawallet.pub
   ```
   - Copia el contenido (por ejemplo, `ssh-ed25519 AAAA... vitawallet@your_email.com`) al portapapeles.
   - En Windows (Git Bash), puedes usar:
     ```bash
     clip < ~/.ssh/id_ed25519_vitawallet.pub
     ```

2. **Iniciar sesión en GitLab**:
   - Ve a [https://gitlab.com](https://gitlab.com) y accede con tu cuenta de Vitawallet (`user_vitawallet`).

3. **Añadir la llave SSH**:
   - Navega a **Settings > SSH Keys** (o directamente a `https://gitlab.com/-/profile/keys`).
   - Pega la llave pública en el campo **Key**.
   - Asigna un **Title** descriptivo, como `Vitawallet Key`.
   - (Opcional) Configura una **Expiration date** para mayor seguridad.
   - Haz clic en **Add key**.

4. **Verificar que la llave se añadió**:
   - En **Settings > SSH Keys**, deberías ver la llave con el título `Vitawallet Key`.

#### **Paso 3: Configurar el archivo `~/.ssh/config` para múltiples llaves**
1. **Crear o editar el archivo `~/.ssh/config`**:
   ```bash
   touch ~/.ssh/config
   chmod 600 ~/.ssh/config
   nano ~/.ssh/config  # O usa tu editor preferido (vim, code, etc.)
   ```

2. **Añadir la configuración**:
   Pega el siguiente contenido, ajustando los detalles según tus cuentas:

   ```text
   # Cuenta de Vitawallet en GitLab
   Host gitlab-vitawallet
       HostName gitlab.com
       User git
       IdentityFile ~/.ssh/id_ed25519_vitawallet
       IdentitiesOnly yes

   # Otra cuenta en GitLab
   Host gitlab-other
       HostName gitlab.com
       User git
       IdentityFile ~/.ssh/id_ed25519_other
       IdentitiesOnly yes
   ```

   - **Explicación**:
     - **Host**: Alias para diferenciar las conexiones (`gitlab-vitawallet` y `gitlab-other`).
     - **HostName**: El dominio real (`gitlab.com` para ambas cuentas, ya que ambas están en GitLab SaaS).
     - **User**: Siempre `git` para conexiones SSH a GitLab.
     - **IdentityFile**: Ruta a la llave privada correspondiente.
     - **IdentitiesOnly yes**: Fuerza el uso de la llave especificada, evitando que SSH intente otras llaves.
   - Guarda y cierra el archivo (`Ctrl+O`, `Enter`, `Ctrl+X` en nano).

3. **Verificar los permisos**:
   ```bash
   ls -l ~/.ssh/config
   ```
   - Debería mostrar permisos `-rw-------` (solo tú puedes leer/escribir).

#### **Paso 4: Iniciar el agente SSH y añadir las llaves**
1. **Iniciar el agente SSH**:
   ```bash
   eval "$(ssh-agent -s)"
   ```
   - Esto inicia el agente SSH, que gestiona las llaves privadas en memoria.

2. **Añadir las llaves privadas**:
   ```bash
   ssh-add ~/.ssh/id_ed25519_vitawallet
   ssh-add ~/.ssh/id_ed25519_other
   ```
   - Verifica que las llaves se añadieron:
     ```bash
     ssh-add -l
     ```
     - Deberías ver ambas llaves (por ejemplo, `256 SHA256:... vitawallet@your_email.com` y la otra).

3. **(Opcional) Hacer que las llaves se carguen automáticamente**:
   - En Linux/macOS, añade al archivo `~/.bashrc` o `~/.zshrc`:
     ```bash
     eval "$(ssh-agent -s)"
     ssh-add ~/.ssh/id_ed25519_vitawallet
     ssh-add ~/.ssh/id_ed25519_other
     ```
   - Guarda y recarga la configuración:
     ```bash
     source ~/.bashrc  # O ~/.zshrc
     ```

#### **Paso 5: Configurar el repositorio de Vitawallet**
1. **Clonar el repositorio (si no lo tienes)**:
   - Obtén la URL SSH del repositorio de Vitawallet desde GitLab:
     - Ve a tu repositorio (`https://gitlab.com/user_vitawallet/vitawallet`).
     - Haz clic en **Clone** y copia la URL SSH (por ejemplo, `git@gitlab.com:user_vitawallet/vitawallet.git`).
   - Modifica la URL para usar el alias `gitlab-vitawallet`:
     ```text
     git@gitlab-vitawallet:user_vitawallet/vitawallet.git
     ```
   - Clona el repositorio:
     ```bash
     git clone git@gitlab-vitawallet:user_vitawallet/vitawallet.git
     cd vitawallet
     ```

2. **Si ya tienes el repositorio clonado**:
   - Cambia la URL remota para usar el alias `gitlab-vitawallet`:
     ```bash
     cd /ruta/al/repositorio/vitawallet
     git remote set-url origin git@gitlab-vitawallet:user_vitawallet/vitawallet.git
     ```
   - Verifica la URL:
     ```bash
     git remote -v
     ```
     - Deberías ver:
       ```
       origin  git@gitlab-vitawallet:user_vitawallet/vitawallet.git (fetch)
       origin  git@gitlab-vitawallet:user_vitawallet/vitawallet.git (push)
       ```

3. **Configurar nombre y correo**:
   - Asegúrate de que el repositorio use el nombre y correo de tu cuenta de Vitawallet:
     ```bash
     git config user.name "Your Vitawallet Name"
     git config user.email "vitawallet@your_email.com"
     ```

#### **Paso 6: Configurar el otro repositorio**
1. **Verificar o configurar la URL remota**:
   - Si ya tienes el otro repositorio clonado:
     ```bash
     cd /ruta/al/repositorio/other_repo
     git remote set-url origin git@gitlab-other:user_other/other_repo.git
     ```
   - Verifica la URL:
     ```bash
     git remote -v
     ```
     - Deberías ver:
       ```
       origin  git@gitlab-other:user_other/other_repo.git (fetch)
       origin  git@gitlab-other:user_other/other_repo.git (push)
       ```

2. **Configurar nombre y correo**:
   - Asegúrate de que el repositorio use el nombre y correo de tu otra cuenta:
     ```bash
     git config user.name "Your Other Name"
     git config user.email "other@your_email.com"
     ```

#### **Paso 7: Comprobar que ambas llaves funcionan**
1. **Probar la conexión SSH para Vitawallet**:
   ```bash
   ssh -T git@gitlab-vitawallet
   ```
   - Deberías ver un mensaje como:
     ```
     Welcome to GitLab, @user_vitawallet!
     ```
   - Si aparece un error como `Permission denied (publickey)`, revisa:
     - Que la llave pública está en GitLab.
     - Que la llave privada está en `ssh-agent` (`ssh-add -l`).
     - Que el archivo `~/.ssh/config` está correcto.

2. **Probar operaciones Git en el repositorio de Vitawallet**:
   - En el directorio del repositorio:
     ```bash
     cd /ruta/al/repositorio/vitawallet
     touch test.txt
     git add test.txt
     git commit -m "Test commit for Vitawallet"
     git push origin main
     ```
   - Deberías ver que el `push` se completa sin pedir credenciales.
   - Verifica en GitLab (`https://gitlab.com/user_vitawallet/vitawallet`) que el archivo `test.txt` está en el repositorio.
   - Prueba un `pull`:
     ```bash
     git pull origin main
     ```
     - Debería funcionar sin errores.

3. **Probar la conexión SSH para el otro repositorio**:
   ```bash
   ssh -T git@gitlab-other
   ```
   - Deberías ver:
     ```
     Welcome to GitLab, @user_other!
     ```

4. **Probar operaciones Git en el otro repositorio**:
   - En el directorio del repositorio:
     ```bash
     cd /ruta/al/repositorio/other_repo
     touch test_other.txt
     git add test_other.txt
     git commit -m "Test commit for other repo"
     git push origin main
     ```
   - Verifica en GitLab (`https://gitlab.com/user_other/other_repo`) que el archivo `test_other.txt` está en el repositorio.
   - Prueba un `pull`:
     ```bash
     git pull origin main
     ```

#### **Paso 8: Integración con tu entorno**
- **Docker**:
  - Si trabajas dentro de un contenedor Docker (por ejemplo, el servicio `app` en tu `docker-compose.yml`), asegúrate de que los archivos `~/.ssh/` estén montados en el contenedor:
    ```yaml
    # docker-compose.yml
    services:
      app:
        image: ruby:3.2
        volumes:
          - ~/.ssh:/root/.ssh:ro  # Monta el directorio SSH
        # ... resto de la configuración ...
    ```
  - Ejecuta comandos Git dentro del contenedor:
    ```bash
    docker-compose exec app bash
    git clone git@gitlab-vitawallet:user_vitawallet/vitawallet.git
    ```

- **RubyMine**:
  - Configura Git en RubyMine:
    - Ve a `File > Settings > Version Control > Git`.
    - Asegúrate de que `SSH executable` esté en `Native`.
  - Depura operaciones Git usando la pestaña `Git` en RubyMine para inspeccionar commits y remotos.

- **Selenium**:
  - No es necesario para esta tarea, pero si usas Selenium para pruebas end-to-end, puedes verificar que los cambios empujados (`test.txt`) aparecen en una interfaz web relacionada con el repositorio.

- **jemalloc**:
  - La optimización de memoria con **jemalloc** no afecta directamente las operaciones SSH/Git, pero asegura que tu contenedor `app` sea eficiente al clonar o trabajar con repositorios grandes.

#### **Solución de problemas comunes**
- **Error: `Permission denied (publickey)`**:
  - Verifica que la llave pública está en GitLab.
  - Asegúrate de que `ssh-agent` tiene la llave (`ssh-add ~/.ssh/id_ed25519_vitawallet`).
  - Comprueba que la URL remota usa el alias correcto (`git@gitlab-vitawallet:...`).
- **SSH usa la llave equivocada**:
  - Asegúrate de que `IdentitiesOnly yes` está en `~/.ssh/config`.
- **Repositorio no clona**:
  - Verifica la URL SSH en GitLab y que tienes permisos en el repositorio.

---

### **PATRONES DE DISEÑO**

**Patrón recomendado: Adaptador (Adapter)**

El archivo `~/.ssh/config` actúa como un adaptador, mapeando conexiones SSH a las llaves privadas correctas según el host alias (`gitlab-vitawallet` o `gitlab-other`).

**Flujo lógico del patrón paso a paso**:
1. **Contexto**: Necesitas usar múltiples llaves SSH para diferentes cuentas de GitLab.
2. **Adaptador**: El archivo `~/.ssh/config` traduce alias de host a configuraciones específicas (llave privada, hostname).
3. **Implementación**: Define alias (`gitlab-vitawallet`, `gitlab-other`) con las llaves correspondientes.
4. **Beneficio**: Permite que Git use la llave correcta automáticamente, sin intervención manual.

---

### **CONSIDERACIONES DE SEGURIDAD**

#### **Posibles vulnerabilidades**
1. **Exposición de la llave privada**:
   - Si `id_ed25519_vitawallet` se comparte o se almacena en un lugar inseguro, un atacante podría acceder a tu repositorio.
   - **Mitigación**: Mantén permisos estrictos (`chmod 600`) y nunca compartas la llave privada.

2. **Configuración incorrecta de `~/.ssh/config`**:
   - Si omites `IdentitiesOnly yes`, SSH podría intentar usar la llave equivocada, causando errores de autenticación.
   - **Mitigación**: Incluye `IdentitiesOnly yes` en cada bloque de `~/.ssh/config`.

3. **Passphrase omitida**:
   - Sin passphrase, si alguien accede a tu máquina, podría usar la llave privada.
   - **Mitigación**: Considera usar una passphrase y `ssh-agent` con `keychain` para automatizar:
     ```bash
     sudo apt-get install keychain  # En Ubuntu
     echo '/usr/bin/keychain --nogui ~/.ssh/id_ed25519_vitawallet' >> ~/.bashrc
     ```

4. **Repositorios en contenedores Docker**:
   - Si montas `~/.ssh/` en un contenedor, asegúrate de que el contenedor sea seguro.
   - **Mitigación**: Usa volúmenes de solo lectura (`:ro`) y elimina contenedores innecesarios.

#### **Mejores prácticas de seguridad**
- **Proteger llaves privadas**: Almacena copias de seguridad en un lugar seguro (por ejemplo, un administrador de contraseñas o un dispositivo cifrado).
- **Usar algoritmos seguros**: Prefiere `ed25519` sobre RSA, como hicimos.
- **Revocar llaves comprometidas**: Si sospechas que una llave está comprometida, elimínala de GitLab y genera una nueva.
- **Auditar accesos**: Revisa regularmente las llaves SSH en `Settings > SSH Keys` de tus cuentas de GitLab.
- **Integrar Brakeman**: Aunque no está relacionado con SSH, ejecuta Brakeman en tu aplicación Rails para detectar otras vulnerabilidades:
  ```bash
  docker-compose exec app brakeman
  ```

---

### **RUTA DE APRENDIZAJE**

Para alcanzar el nivel **Mid** como desarrollador Rails, profundiza en los siguientes temas relacionados con SSH y Git:

1. **Gestión de llaves SSH**:
   - Aprende a usar `ssh-agent` y `keychain` para manejar passphrases.
   - Estudia cómo configurar llaves SSH en entornos CI/CD (por ejemplo, GitLab CI).

2. **Configuración avanzada de Git**:
   - Explora `git config` para configuraciones por repositorio.
   - Aprende a usar `core.sshCommand` para especificar llaves por repositorio:
     ```bash
     git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_vitawallet -F /dev/null"
     ```

3. **Seguridad en desarrollo**:
   - Estudia cómo proteger credenciales en entornos Dockerizados.
   - Aprende a usar herramientas como `vault` para gestionar secretos.

4. **Automatización con GitLab CI**:
   - Configura pipelines en GitLab CI que usen llaves SSH como **Deploy Keys** para clonar repositorios privados.

**Recursos recomendados**:
- **GitLab Documentation**: [Use SSH keys to communicate with GitLab](https://docs.gitlab.com/ee/user/ssh.html)[](https://docs.gitlab.com/user/ssh/)
- **Medium**: [Managing Multiple SSH Keys for GitHub and GitLab](https://medium.com/@chanceespinosa/managing-multiple-ssh-keys-for-github-and-gitlab-33f6c4e64657)[](https://medium.com/%40chancedev093/managing-multiple-ssh-keys-for-github-and-gitlab-7d77604f8773)
- **Stack Overflow**: [SSH key per project in GitLab](https://stackoverflow.com/questions/55109209/ssh-key-per-project-in-gitlab)[](https://stackoverflow.com/questions/55243273/ssh-key-per-project-in-gitlab)
- **Libro**: *Pro Git* de Scott Chacon y Ben Straub.

---

### **ROL: Ingeniero de software profesional**

Como ingeniero de software, he proporcionado un flujo completo para generar y configurar una nueva llave SSH para tu repositorio de Vitawallet en GitLab, asegurando que no interfiera con tu otra llave SSH para otra cuenta/recurso. La solución incluye comandos detallados, configuración del archivo `~/.ssh/config`, y comprobaciones para verificar que ambas llaves funcionan. Se integra con tu entorno Dockerizado (montando `~/.ssh/`), RubyMine (para Git), y considera optimizaciones como **jemalloc**. También he abordado consideraciones de seguridad y una ruta de aprendizaje para ayudarte a avanzar hacia el nivel Mid.

**Recomendación final**:
- Sigue los pasos exactamente como se describen, ajustando los nombres de usuario, correos, y URLs de repositorio.
- Ejecuta las comprobaciones (`ssh -T` y `git push/pull`) para confirmar que ambas llaves funcionan.
- Si usas Docker, monta el directorio `~/.ssh/` en tu contenedor para operaciones Git.
- Revisa las llaves en GitLab regularmente y considera añadir passphrases para mayor seguridad.

Si encuentras errores (por ejemplo, `Permission denied`) o necesitas ayuda con configuraciones adicionales (como GitLab CI o pruebas Selenium para verificar cambios), comparte más detalles, ¡y lo resolveremos juntos!


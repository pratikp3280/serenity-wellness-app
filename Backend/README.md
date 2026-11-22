# Serenity Backend

Spring Boot REST API for the Serenity wellness application. This folder is a standalone Maven project and can be shared or opened independently of the frontend.

## Requirements

- Java 21
- MySQL 8 or a compatible MySQL server
- Maven Wrapper (included; Maven does not need to be installed)

## Configure the database

The application reads its database settings from environment variables. The default URL targets a local database named `serenity_wellness`; create that database before starting the API. Flyway applies the versioned SQL files in `src/main/resources/db/migration` on startup.

| Variable | Default | Purpose |
| --- | --- | --- |
| `DB_URL` | `jdbc:mysql://localhost:3306/serenity_wellness` | JDBC connection URL |
| `DB_USERNAME` | `root` | MySQL user |
| `DB_PASSWORD` | empty | MySQL password |

Set these variables in your shell or IDE run configuration. Do not commit real credentials. For example, in PowerShell:

```powershell
$env:DB_URL = "jdbc:mysql://localhost:3306/serenity_wellness"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your-local-password"
```

## Run

From this directory:

```powershell
./mvnw.cmd spring-boot:run
```

On macOS or Linux:

```bash
./mvnw spring-boot:run
```

The API listens on `http://localhost:8080` by default. Check `GET /api/health` to confirm it is responding. Build the executable JAR with `./mvnw.cmd package` (or `./mvnw package` on macOS/Linux); the output is written to `target/`.

## Project layout

```text
Backend/
|-- .mvn/wrapper/                 Maven Wrapper configuration
|-- src/
|   |-- main/
|   |   |-- java/com/serenity/
|   |   |   |-- config/           Spring Security and password configuration
|   |   |   |-- controller/       REST endpoints
|   |   |   |-- converter/        Persistence and API value conversion
|   |   |   |-- demo/             Development-only demo runner
|   |   |   |-- dto/              Request and response objects
|   |   |   |-- entity/           JPA entities
|   |   |   |-- enums/            Shared enumerations
|   |   |   |-- exception/        Domain exceptions and API error handling
|   |   |   |-- repository/       Spring Data repositories
|   |   |   |-- service/          Application and business logic
|   |   |   `-- SerenityBackendApplication.java
|   |   `-- resources/
|   |       |-- db/migration/     Flyway database migrations
|   |       `-- application.properties
|   `-- test/java/com/serenity/   Automated tests
|-- .gitignore
|-- mvnw / mvnw.cmd               Cross-platform Maven Wrapper scripts
|-- pom.xml                       Maven project and dependencies
`-- README.md
```

## API areas

- `GET /api/health` - health check
- `/api/auth` - registration, login, and session endpoints
- `/api/moods` - authenticated mood entries and history

The Maven `target/` output and IDE-specific files are intentionally excluded from the shared source package; Maven recreates build output when needed.

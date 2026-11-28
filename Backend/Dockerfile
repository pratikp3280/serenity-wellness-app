# Build the Spring Boot application
FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

COPY src/ src/

RUN ./mvnw -B -DskipTests clean package


# Run the application using a smaller Java runtime image
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build --chown=10001:10001 /workspace/target/serenity-backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Run as a non-root user
USER 10001:10001

EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=65.0", "-jar", "/app/app.jar"]

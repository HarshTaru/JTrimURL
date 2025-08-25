# ---------- Build Stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and source code
COPY urlshorternersb/pom.xml .
COPY urlshorternersb/src ./src

# Build jar (skip tests for faster builds)
RUN mvn clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Render sets $PORT dynamically
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

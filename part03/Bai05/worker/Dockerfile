FROM maven:3.9.6-eclipse-temurin-21-alpine as build
WORKDIR /app
COPY . .
RUN mvn clean package

FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/target/worker-1.0-SNAPSHOT.jar worker.jar
CMD ["java", "-jar", "worker.jar"]

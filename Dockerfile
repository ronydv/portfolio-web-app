FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /target/industech-portfolio-0.0.1-SNAPSHOT.jar industech.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","industech.jar"]
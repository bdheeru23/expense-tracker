FROM openjdk:8-jdk-alpine

EXPOSE 8080

ADD target/expense-tracker-api.jar expense-tracker-api.jar

ENTRYPOINT ["java","-jar","/expense-tracker-api.jar"]
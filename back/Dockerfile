###
### BUILD LAYER
##################################
FROM maven:3.5-jdk-8 as MVN_BUILD

COPY src /usr/src/myapp/src
COPY pom.xml /usr/src/myapp

RUN mvn -f /usr/src/myapp/pom.xml clean package

###
### REAL APP DEPLOY LAYER
#############################
FROM java:8

COPY --from=MVN_BUILD /usr/src/myapp/target/backauth-jar-with-dependencies.jar /backauth.jar

EXPOSE 4567
CMD ["java", "-jar", "/backauth.jar"]
FROM java:8 

# Install maven
RUN apt-get update
RUN apt-get install -y maven

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Prepare by downloading dependencies
COPY pom.xml /usr/src/app/pom.xml
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

# Adding source, compile and package into a fat jar
COPY src /usr/src/app/src
RUN ["mvn", "package"]

EXPOSE 4567
CMD ["/usr/lib/jvm/java-8-openjdk-amd64/bin/java", "-jar", "target/backauth-jar-with-dependencies.jar"]
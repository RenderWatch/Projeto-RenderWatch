#!/bin/bash
java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo "Java instalado" #print no terminal
        else #se nao,
                echo "Java não instalado" #print no terminal
                echo "Gostaria de instalar o java? [s/n]"

                read get #varável que guarda resposta do usuário
        if [ \"$get\"  ==  \"s\" ]; #se retorno for igual a s

                then
                sudo apt install openjdk-17-jre -y #executa instalação do java
        fi # fecha o 2° if
fi #fecha o 1° if

        ls | grep "*.jar"
        if [ $? = 0 ];
                then
                        sudo find -name 'renderwatch-jar-1.0-SNAPSHOT-jar-with-dependencies.jar' -delete
        fi

        echo "Baixando Renderwatch"
        sleep 3
        wget https://raw.githubusercontent.com/RenderWatch/RenderWatchJAR/main/renderwatch-jar-1.0-SNAPSHOT-jar-with-dependencies.jar
        echo "Executando Renderwatch"
        sleep 3
        java -jar renderwatch-jar-1.0-SNAPSHOT-jar-with-dependencies.jar

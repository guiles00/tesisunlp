<?php
if($_SERVER['REQUEST_METHOD'] == 'PUT'){
	echo "guarda o modifica data\n";
	print_r(file_get_contents("php://input") );

}


if($_SERVER['REQUEST_METHOD'] == 'GET'){
	echo "{'id':'1','data':'andeskini'}";
}
# generator-ig-fullstack [![NPM version][npm-image]][npm-url]
> 

## Requisitos previos
* Node.js y npm - Descargar e instalar [node.js](https://nodejs.org/)
* MongoDB - Descargar e instalar [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community). Luego de haber instalado MongoDB debe ejecutar el proceso mongod.

## Tipos de aplicaciones que se pueden generar
| Tipo          |         Tecnologías         |
|---------------------|-------------------------------------------------------------------------------|
| RESTful API         | Node.js, Express, Mongo (Mongoose)                                            |
| Angular FullStack   | Node.js, Express, Mongo (Mongoose), Angular 4, Angular-CLI, Bootstrap v4  |


## Instalación

Primero, instala [Yeoman](http://yeoman.io) y el generator-ig-fullstack usando [npm](https://www.npmjs.com/)

```bash
npm install -g yo
npm install -g generator-ig-fullstack
```

Cree un archivo config.json en la carpeta del proyecto. A continuación se muestra un ejemplo de como debe quedar la configuración del archivo.


```json
{
  "globalMessages": {
    "required": "El campo es requerido",
    "minlength": "la longitud mínima es de %d caracteres",
    "maxlength": "La longitud máxima es de %d caracteres"
  },
  "entities": [
    {
      "name": "Producto",
      "attributes": [
        {
          "name": "name",
          "type": "String",
          "required": true,
          "messages": {
            "maxlength": "La longitud máxima es de 30 carácteres"
          },
          "validations": [
            {
              "type": "minlength",
              "value": 8,
              "message": "El campo name debe tener como mínimo una longitud de 8 carácteres"
            },
            {
              "type": "maxlength",
              "value": 30
            }
          ]
        },
        {
          "name": "description",
          "type": "String",
          "required": true,
          "control": "textarea"
        },
        {
          "name": "category",
          "type": "String",
          "required": true,
          "validations": [
            {
              "type": "pattern",
              "value": "[A-Z]*",
              "message": "Valor debe ser en mayúsculas"
            }
          ]
        },
        {
          "name": "price",
          "type": "Number",
          "required": true
        }
      ],
      "relationships": [
        {
          "entityRef": "Proveedor",
          "typeRelationship": "many-to-one",
          "fieldName": "proveedor"
        }
      ]
    },
    {
      "name": "Proveedor",
      "attributes": [
        {
          "name": "name",
          "type": "String"
        },
        {
          "name": "email",
          "type": "String",
          "control": "email"
        },
        {
          "name": "address",
          "type": "String"
        },
        {
          "name": "telefono",
          "type": "String",
          "control": "number"
        }
      ],
      "relationships":[
        {
          "entityRef": "Producto",
          "typeRelationship": "one-to-many",
          "fieldName": "productos",
          "localField": "_id",
          "foreignField": "proveedor"
        }
      ]
    }
  ]
}
```
Luego generas tu nuevo proyecto:

```bash
yo ig-fullstack
```

## Tipos de datos y validaciones
| MongoDB  |         Validaciones         |
|----------|------------------------------|
| String   | required, minlength, maxlength, pattern  |
| Number   | required, minlength, maxlength           |
| Date     | required                     |
| Boolean  | required                     |

## Especificación de los mensajes de las validaciones

El atributo globalMessages permite especificar mensajes globales que se usarán en la aplicación en caso de que no se especifiquen en los atributos.

```json
{
  "globalMessages": {
    "required": "El campo es requerido",
    "minlength": "la longitud mínima es de %d caracteres",
    "maxlength": "La longitud máxima es de %d caracteres"
  }
}
```

Se pueden especificar los mensajes de validación de un atributo de dos maneras:

1. Dentro de cada validación, especificar el respectivo mensaje.
```json
{
  "name": "name",
  "type": "String",
  "required": true,
  "messages": {
    "required": "El campo name es requerido",
    "minlength": "La longitud mínima es de 30 carácteres"
  },
  "validations": [
    {
      "type": "minlength",
      "value": 8,
      "message": "El campo name debe tener como mínimo una longitud de 8 carácteres"
    },
    {
      "type": "maxlength",
      "value": 30,
      "message": "El campo name debe tener como máximo una longitud de 30 carácteres"
    }
  ]
}

```

2. Crear un atributo messages y dentro de el, especificar los mensajes de las validaciones.
```json
{
  "name": "name",
  "type": "String",
  "required": true,
  "messages": {
    "required": "El campo name es requerido",
    "minlength": "La longitud mínima es de 8 carácteres",
    "maxlength": "La longitud máxima es de 30 carácteres"
  },
  "validations": [
    {
      "type": "minlength",
      "value": 8
    },
    {
      "type": "maxlength",
      "value": 30
    }
  ]
}
```

## Especificación de tipos de control a usar

A un atributo de una entidad se le puede especificar un tipo de control (input) a usar. Tipos de controles válidos:

* date, datetime-local, email, month, number, password, time, url, week, text

Si no se le especifica un control, por defecto se usará un control según su tipo de dato.

## Especificar el posicionamiento de los controles

Por defecto un control usa las 12 columnas de la grilla de Bootstrap, pero se pueden especificar el posicionamiento de los controles agregando el campo position a un atributo, de la siguiente manera:

```json
{
  "name": "Employee",
  "attributes": [
    {
      "name": "LastName",
      "type": "String",
      "position": {
        "row": 0,
        "col": 0
      }
    },
    {
      "name": "FirstName",
      "type": "String",
      "position": {
        "row": 0,
        "col": 1
      }
    },
    {
      "name": "Title",
      "type": "String",
      "position": {
        "row": 0,
        "col": 2
      }
    },
    {
      "name": "TitleOfCourtesy",
      "type": "Number",
      "position": {
        "row": 1,
        "col": 0
      }
    },
    {
      "name": "BirthDate",
      "type": "Date",
      "position": {
        "row": 1,
        "col": 1
      }
    },
    {
      "name": "HireDate",
      "type": "Date",
      "position": {
        "row": 2,
        "col": 0
      }
    },
    {
      "name": "Address",
      "type": "String",
      "position": {
        "row": 2,
        "col": 1
      }
    },
    {
      "name": "City",
      "type": "String",
      "position": {
        "row": 3,
        "col": 0
      }
    },
    {
      "name": "Region",
      "type": "String",
      "position": {
        "row": 3,
        "col": 1
      }
    },
    {
      "name": "PostalCode",
      "type": "String",
      "position": {
        "row": 4,
        "col": 0
      }
    },
    {
      "name": "Coutry",
      "type": "String",
      "position": {
        "row": 4,
        "col": 1
      }
    },
    {
      "name": "HomePhone",
      "type": "String",
      "position": {
        "row": 5,
        "col": 0
      }
    },
    {
      "name": "Extension",
      "type": "String",
      "position": {
        "row": 5,
        "col": 1
      }
    }
  ]
}
```

Dando un resultado como este:

![alt text](https://raw.githubusercontent.com/Yeyoxfunny/generator-ig-fullstack/master/docs/posicionamiento-controles.PNG)

## Relaciones
### One-To-Many
| Key         |         Explicación          |
|-------------|-------------------------------------------------------------|
| entityRef      | Nombre de la entidad con la que se quiere hacer la relación |
| fieldName   | Nombre del campo para usar en la definición del modelo      |

### Many-To-One
| Key         |         Explicación          |
|-------------|-------------------------------------------------------------|
| entityRef      | Nombre de la entidad con la que se quiere hacer la relación |
| fieldName   | Nombre del campo para usar en la definición del modelo      |
| localField   | Primary Key      |
| foreignField   | Foreign Key      |

## Convención de nombres a seguir en el proyecto:
Este es el formato correcto para el nombramiento de las entidades y sus atributos:

| Convención  |    Ejemplo    |            Donde usarlas           |
|-------------|---------------|------------------------------------|
| Camel Case  | tipoProducto  | Variables                          |
| Pascal Case | TipoProducto  | Clases                             |
| Kebab Case  | tipo-producto | Nombre de archivos, carpetas, URL  |
| Start Case  | Tipo Producto |  Títulos en la app                 |

## License

Apache-2.0 © [SMorales]()


[npm-image]: https://badge.fury.io/js/generator-ig-fullstack.svg
[npm-url]: https://npmjs.org/package/generator-ig-fullstack

const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

//data
const {cursos} = require('./data.json');


const aschema = buildSchema(`
    type Query {
        curso(id: Int!) : Curso
        cursos(topico: String!): [Curso]

    }

    type Curso{
        id: Int
        titulo: String
        autor: String
        topico: String
        url: String
    }
`);

let getCurso = (args) =>{
    let id = args.id;
    return cursos.filter(curso => {
        return curso.id == id;
    })[0]
}

let getCursos = (args) =>{
    if(args.topico) {
        let topico = args.topico;
        return cursos.filter(curso => curso.topico === topico);        
    } else {
        return cursos;
    }

}

const aroot = {
    curso: getCurso,
    cursos: getCursos
}

app.use('/graphql',express_graphql({
    schema: aschema,
    rootValue: aroot,
    graphiql: true
}));


app.listen(3000, () => console.log('server escuchando por el puerto 3000'));

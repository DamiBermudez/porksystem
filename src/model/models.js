const db = require('../db/connection');


//index
exports.index =(req,res)=>{res.render('index')};

// Alimentación
exports.alimentacion = (req,res)=>{res.render('alimentacion')};
exports.consultar_alimentacion = (req,res)=>{ res.render('consultar_alimentacion', { records: [], message: 'Realice la busqueda' });};
exports.consultaAlimentacionFechas = (req, res) => {

    const fecha_alimentacion_uno= req.query.fecha_alimentacion_uno;
    const fecha_alimentacion_dos= req.query.fecha_alimentacion_dos;

    const query = `
     SELECT alimentacion.id_alimentacion, alimentacion.fecha, alimentacion.cant, lote_ceba.nom_lote,alimentacion.lote_ceba_id_lote FROM 
     alimentacion JOIN lote_ceba ON lote_ceba.id_lote = alimentacion.lote_ceba_id_lote WHERE alimentacion.fecha BETWEEN ? AND ?`;
    
        db.query(query,[fecha_alimentacion_uno,fecha_alimentacion_dos], (err, results) => {
        
        if (err) {
            return res.render('consultar_alimentacion', { records: [], message: 'Error al consultar los datos' });          
        
        }else if(results.length===0) {
            res.render('consultar_alimentacion',{records:[],message:'No se  encontraron valores en el rango de fechas '+ fecha_alimentacion_uno +' y '+ fecha_alimentacion_dos});
        }
        res.render('consultar_alimentacion',{records:results,message:''});
    });
};
exports.consultaAlimentacionLote = (req, res) => {
    const num_lote = req.query.num_lote; // Cambiado de req.body a req.query
    const query = `
        SELECT alimentacion.id_alimentacion, alimentacion.fecha, alimentacion.cant, lote_ceba.nom_lote,alimentacion.lote_ceba_id_lote
        FROM alimentacion
        JOIN lote_ceba ON lote_ceba.id_lote = alimentacion.lote_ceba_id_lote
        WHERE lote_ceba.id_lote = ?`;
 
        db.query(query, [num_lote], (err, results) => {
        if (err) {
            return res.render('consultar_alimentacion', { records: [], message: 'Error al consultar los datos' });
        }else if(results.length===0) {
            res.render('consultar_alimentacion',{records:[],message:'No se  encontraron valores con el número de lote '+ num_lote});
        }     
        res.render('consultar_alimentacion', { records: results, message: '' });
    });
};
exports.registrar_alimentacion=(req,res)=>{
    
    const query = `SELECT id_lote, nom_lote FROM lote_ceba`;
    db.query(query,(err,results)=>{
        if(err){
            return res.render('registrar_alimentacion',{records:[],message:''});
        }
        res.render('registrar_alimentacion',{records:results,message:'Ingrese un nuevo  registro.'});

    })
};
exports.insertar_alimentacion=(req,res)=>{
    
    const {lote_alimentacion,blts_alimentacion} = req.body;
    const query = `INSERT INTO alimentacion (fecha,cant,lote_ceba_id_lote)  VALUES (now(),?,?)`;
    db.query(query,[blts_alimentacion,lote_alimentacion],(err,results)=>{
        if(err){
            console.error('Error al almacenar los datos:', err);
            return res.render('registrar_alimentacion', { records:[],message: 'Error al almacenar los datos' });
        }
        res.render('registrar_alimentacion',{records:[],message:'Datos almacenados exitosamente!'});

    })
};

//Ceba
exports.ceba = (req,res)=>{res.render('ceba')};
exports.registrar_ceba=(req,res)=>{res.render('registrar_ceba',{message:'Inserte un nuevo registro'})};
exports.insertar_ceba=(req,res)=>{
    const {num_lote,edad_lote,cant_animales,peso_prom,descripcion} = req.body;
    const query = `INSERT INTO lote_ceba (fecha_ingreso,nom_lote,edad_lote,cant_lote,peso_prom_lote,observacion)
                   VALUES (now(),?,?,?,?,?)`;
    db.query(query,[num_lote,edad_lote,cant_animales,peso_prom,descripcion],(err,results)=>{
        if(err){
            console.error('Error al almacenar los datos:', err);
            return res.render('registrar_ceba', { records:[],message: 'Error al almacenar los datos' });
        }
            res.render('registrar_ceba',{records:[],message:'Datos almacenados exitosamente!'});
    })
};
exports.consultar_ceba = (req,res)=>{ res.render('consultar_ceba', { records: [], message: 'Realice la busqueda' });};
exports.consultaCebaFechas = (req,res)=>{
    const fecha_alimentacion_uno= req.query.fecha_alimentacion_uno;
    const fecha_alimentacion_dos= req.query.fecha_alimentacion_dos;
    const query=`SELECT * FROM lote_ceba WHERE fecha_ingreso BETWEEN ? AND ?`;
    db.query(query,[fecha_alimentacion_uno,fecha_alimentacion_dos],(err,results)=>{
        if (err) {
            return res.render('consultar_ceba', { records: [], message: 'Error al consultar los datos' });          
        
        }else if(results.length===0) {
            res.render('consultar_ceba',{records:[],message:'No se  encontraron valores en el rango de fechas '+ fecha_alimentacion_uno +' y '+ fecha_alimentacion_dos});
        }
        res.render('consultar_ceba',{records:results,message:''});
    })
};
exports.consultaCebaLote = (req,res)=>{
    const num_lote = req.query.num_lote;
    
    const query = `SELECT * FROM lote_ceba WHERE id_lote = ?`;
    db.query(query,[num_lote],(err,results)=>{
        if (err) {
            return res.render('consultar_ceba', { records: [], message: 'Error al consultar los datos' });
        }else if(results.length===0) {
            res.render('consultar_ceba',{records:[],message:'No se  encontraron valores con el número de lote '+ num_lote});
        }     
        res.render('consultar_ceba', { records: results, message: '' });
    })
};


//vacunación
exports.vacunacion = (req,res)=>{res.render('vacunacion')};

exports.registrar_vacunacion=(req,res)=>{
    const query = `SELECT id_lote, nom_lote FROM lote_ceba`;
    db.query(query,(err,results)=>{
        if(err){
            return res.render('registrar_alimentacion',{records:[],message:''});
        }
        res.render('registrar_vacunacion',{records:results,message:'Inserte un nuevo registro'});
    })    
};
exports.insertar_vacunacion=(req,res)=>{
    const {lote_alimentacion,nom_vacuna,cod_cepa} = req.body;
    const query = `INSERT INTO vacunacion (fecha_vac,vacuna,num_cepa,lote_ceba_id_lote) VALUES (now(),?,?,?)`;
    db.query(query,[nom_vacuna,cod_cepa,lote_alimentacion],(err,results)=>{
        if(err){
            console.error('Error al almacenar los datos:', err);
            return res.render('registrar_vacunacion', { records:[],message: 'Error al almacenar los datos' });
        }
            res.render('registrar_vacunacion',{records:[],message:'Datos almacenados exitosamente!'});
    })
        
};
exports.consultar_vacunacion = (req,res)=>{ res.render('consultar_vacunacion', { records: [], message: 'Realice la busqueda' });};
exports.consultaVacunacionFechas=(req,res)=>{
    const fecha_alimentacion_uno=req.query.fecha_alimentacion_uno;
    const fecha_alimentacion_dos=req.query.fecha_alimentacion_dos;
    const query=`SELECT * FROM vacunacion WHERE fecha_vac BETWEEN ? AND ?`;
    db.query(query,[fecha_alimentacion_uno,fecha_alimentacion_dos],(err,results)=>{
        if (err) {
            return res.render('consultar_vacunacion', { records: [], message: 'Error al consultar los datos' });          
        
        }else if(results.length===0) {
            res.render('consultar_vacunacion',{records:[],message:'No se  encontraron valores en el rango de fechas '+ fecha_alimentacion_uno +' y '+ fecha_alimentacion_dos});
        }
        res.render('consultar_vacunacion',{records:results,message:''});
    })
    
}
exports.consultaVacunacionLote=(req,res)=>{
    const num_lote =req.query.num_lote;
    const query = `SELECT * FROM vacunacion WHERE lote_ceba_id_lote = ?`;
    db.query(query,[num_lote],(err,results)=>{
        if (err) {
            return res.render('consultar_vacunacion', { records: [], message: 'Error al consultar los datos' });
        }else if(results.length===0) {
            res.render('consultar_vacunacion',{records:[],message:'No se  encontraron valores con el número de lote '+ num_lote});
        }     
        res.render('consultar_vacunacion', { records: results, message: '' });
    })
}

// Mortalidad
exports.mortalidad = (req,res)=>{res.render('mortalidad')};

exports.registrar_mortalidad = async (req, res) => {

    const query1 = 'SELECT id_lote, nom_lote FROM lote_ceba';
    const query2 = 'SELECT * FROM enfermedad';

    try {      

        // Promisify the query function for easier async/await usage
        const promiseQuery = (query) => {
            return new Promise((resolve, reject) => {
                db.query(query, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        };

        // Run queries in parallel
        const [results1, results2] = await Promise.all([
            promiseQuery(query1),
            promiseQuery(query2)
        ]);

        // Render the view with the results
        res.render('registrar_mortalidad', {
            records: results1,
            records2: results2,
            message: 'Inserte un nuevo registro'
        });

    } catch (err) {
        // Handle errors
        res.render('registrar_mortalidad', {
            records: [],
            records2: [],
            message: 'Error al obtener los datos'
        });
    }
}

exports.insertar_mortalidad = (req,res) =>{
    const {lote,enfermedad,cant_animales} = req.body;
    const query = `INSERT INTO mortalidad (fecha,cant,enfermedad_id_enfermedad,lote_ceba_id_lote) VALUES (now(),?,?,?)`;
    db.query(query,[cant_animales,enfermedad,lote],(err,results)=>{
        if(err){
            console.error('Error al almacenar los datos:', err);
            return res.render('registrar_mortalidad', { records:[],records2:[],message: 'Error al almacenar los datos' });
        }
            res.render('registrar_mortalidad',{records:[],records2:[],message:'Datos almacenados exitosamente!'});
    })
}
exports.consultar_mortalidad = (req,res)=>{res.render('consultar_mortalidad',{records:[],message:'Realice la busqueda'})};
exports.consultaMortalidadFechas = (req,res)=>{
    const fecha_alimentacion_uno=req.query.fecha_alimentacion_uno;
    const fecha_alimentacion_dos=req.query.fecha_alimentacion_dos;
    const query=`SELECT 
                        mortalidad.*,
                        lote_ceba.id_lote,
                        lote_ceba.nom_lote,
                        enfermedad.*
		            FROM
                        mortalidad join lote_ceba join enfermedad 
                    ON
                        mortalidad.lote_ceba_id_lote = lote_ceba.id_lote 
                    AND
                        mortalidad.enfermedad_id_enfermedad = enfermedad.id_enfermedad 
                    WHERE
                        mortalidad.fecha BETWEEN ? AND ?`;
    db.query(query,[fecha_alimentacion_uno,fecha_alimentacion_dos],(err,results)=>{
        if (err) {
            return res.render('consultar_mortalidad', { records: [], message: 'Error al consultar los datos' });          
        
        }else if(results.length===0) {
            res.render('consultar_mortalidad',{records:[],message:'No se  encontraron valores en el rango de fechas '+ fecha_alimentacion_uno +' y '+ fecha_alimentacion_dos});
        }
        res.render('consultar_mortalidad',{records:results,message:''});
    })
    
}

exports.consultaMortalidadLote = (req,res)=>{
    const num_lote=req.query.num_lote;
     const query=`SELECT 
                        mortalidad.*,
                        lote_ceba.id_lote,
                        lote_ceba.nom_lote,
                        enfermedad.*
		            FROM
                        mortalidad join lote_ceba join enfermedad 
                    ON
                        mortalidad.lote_ceba_id_lote = lote_ceba.id_lote 
                    AND
                        mortalidad.enfermedad_id_enfermedad = enfermedad.id_enfermedad 
                    WHERE
                         lote_ceba.id_lote = ?`;
    db.query(query,[num_lote],(err,results)=>{
        if (err) {
            return res.render('consultar_mortalidad', { records: [], message: 'Error al consultar los datos' });          
        
        }else if(results.length===0) {
            res.render('consultar_mortalidad',{records:[],message:'No se  encontraron valores para el lote '+ num_lote});
        }
        res.render('consultar_mortalidad',{records:results,message:''});
    })
    
}





exports.cliente =(req,res)=>{res.render('cliente')};



const listarUsuarios = async (req, res = express.request) => {
    const task = await Task.find().populate('tareas', 'title');

    try{
        res.status(200).json({
            ok: true,
            task,
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}
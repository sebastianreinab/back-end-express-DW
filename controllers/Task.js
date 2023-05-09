const creatTask = async (req, res = express.request) => {
    const task = new Task(req.body);

    try{
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok: true,
            task: saved
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}

const listarTask = async (req, res = express.request) => {
    const task = await Task.find().populate('user', 'name');

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


import express from 'express'; 
import * as diaryServices from '../services/diaryServices'; 
import toNewDiaryEntry from '../utils';

const router = express.Router(); 

router.get('/', (_req, res) => { 
    res.send(diaryServices.getEntriesWithoutSensitiveInfo()); 
})

router.get('/:id', (req, res) => { 
    const diary = diaryServices.findById(Number(req.params.id)); 

    return (diary != null) ? res.send(diary) : res.send(404);
})

router.post('/', (req, res) => { 
    try{ 
        const newDairyEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryServices.addDiary(newDairyEntry);
        res.json(addedEntry); 
    }catch(e: any){ 
        res.status(400).send(e.message); 
    }
  
})


export default router; 
const express=require('express');
const con = require('./connection');
const app=express();
app.use(express.json())
const port=3003;

app.use(express.json())

app.get('/viewBlog',(req,res)=>{
    con.query('SELECT * FROM BLOG',(err,rows)=>{
        if(err){
            res.status(500).json({error:'Internal server error'})
        }
        else{
            res.status(200).json(rows)
        }
    })
})



app.post('/addBlog', (req, res) => {
    var blog = req.body;
    var blog_Data = [blog.BID,blog.BNAME, blog.BAUTHOR,blog.BDESC]
    con.query('INSERT INTO BLOG(BID,BNAME,BAUTHOR,BDESC) values(?)', [blog_Data], (err, rows) => {
        if (err) {
            res.status(400).json(err)
        } else {
            // res.send(rows)
            return res.status(200).json({ message: 'blog  added successfully' });
        }
    })
})

app.post('/updateBlog',(req,res)=>{
    var BID=req.body.BID;
    var UpdateData=req.body;
    con.query('UPDATE BLOG SET ? where BID='+UpdateData.BID,[UpdateData],(err,rows)=>{
        if(!BID){
            res.status(400).json(err)
        }else{
            // res.send(rows)
            return res.status(200).json({ message: 'blog  updated successfully' });
        }
    });
})


app.delete('/deleteBlog',(req,res)=>{
    var DeleteData=req.body.BID;
    if(!DeleteData){
        return res.status(400).json({ error: 'Invalid ID. BID is required.' })
    }
        con.query('DELETE FROM BLOG WHERE BID = ?', [DeleteData], (err, result) => {
        if (err){
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }
        if (result.affectedRows > 0) {
                        return res.status(200).json({ message: 'blog  deleted successfully' });
                    } else {
                        return res.status(404).json({ message: 'blog ID not found' });
                    }
             
    });
}) 


app.post('/addMovie', (req, res) => {
    var movie = req.body;
    var movie_Details = [movie.MID,movie.MNAME, movie.MDIRECTOR,movie.MDESC]
    con.query('INSERT INTO MOVIE(MID,MNAME,MDIRECTOR,MDESC) values(?)', [movie_Details], (err, rows) => {
        if (err) {
            res.status(400).json(err)
        } else {
            // res.send(rows)
            return res.status(200).json({ message: 'movie  added successfully' });
        }
    })
})

app.post('/addRatings', (req, res) => {
    var movie = req.body;
    var movie_Details = [movie.MID,movie.MNAME, movie.RATINGS]
    con.query('INSERT INTO RATINGS(MID,MNAME,RATINGS) values(?)', [movie_Details], (err, rows) => {
        if (err) {
            res.status(400).json(err)
        } else {
            // res.send(rows)
            return res.status(200).json({ message: 'movie  ratings added successfully' });
        }
    })
})

app.post('/avgRatings', (req, res) => {
    var MID = req.body.MID;
    
   con.query('SELECT AVG(RATINGS) as averageRating from RATINGS WHERE MID=?',[MID],(err, rows) => {
    console.log(rows[0].averageRating)
        if (err) {
            res.status(400).json(err)
        } else {
                    return res.status(200).json({averageRating:rows[0].averageRating});
        }
    })
})




app.listen(port,()=>{
    console.log(`server is running ${port}`)
})




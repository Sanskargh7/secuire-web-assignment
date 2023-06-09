
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken')

    exports.sendEmail=(email)=>{
      let transport=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'sanskargh5222@gmail.com',
                        // pass:'vmdbwasprckfmzof'
                        pass:"oumkjmteppyqnbme"
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                    
                    })
                    let mail={
                        from:'sanskargh9087@gmail.com',
                        to:email,
                        subject:'Secuire Web',
                       html:`<h3>Thanks for registering with us</h3>`
                        
                        }
                    transport.sendMail(mail,function(error,info){
                        if(error){
                            console.log(error)
                        }else{
                            // console.log('dione')
                        //    res.status(200).send('email sent successfully'+info.response)
        
                        }
                    })
            
            
                }

//generate tokens
 exports.generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'seceret',
      {
        expiresIn: '30d',
      }
    );
  };
  //validate tokens
  exports.isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log(authorization);
    if (authorization) {
    //   const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(authorization, 'seceret', (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };









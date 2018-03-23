

var mongoose = require('mongoose'),
Player = mongoose.model("Player"),
ObjectId = mongoose.Types.ObjectId

//db = require('db'),
//server = require('server');





//add New User into the record
exports.addUser = function(req, res, next) {

        
    var user = new Player({
        "pFirstName": req.params.pFirstName,
        "pLastName": req.params.pLastName,
        "pEmail": req.params.pEmail,
        "pBirthday": req.params.pBirthday,
        "pPassword": SHA1(req.params.pPassword),
        "pLoginType": req.params.pLoginType,
        "pAuthenticated": req.params.pAuthenticated,
        "pAccountStatus": req.params.pAccountStatus,
        "pAddress": req.params.pAddress,  
        "pGender": req.params.pGender,  
        "pBio": req.params.pBio,
        "pHeight": req.params.pHeight,
        "pWeight": req.params.pWeight,
        "pPhone": req.params.pPhone,
        "pPic": req.params.pPic,
        "pAndroidId": req.params.pAndroidId
    });
    console.log('Request Received: ' + req.params);
    

    console.log('Adding user: ' + JSON.stringify(user));
    user.save(function (err) {

        if (err) {
            res.send({'Status':'Error','Message':err});
        } else if (user.pFirstName == "") {
            console.log("Empty First Name, Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty First Name"});
        }else if (user.pLastName == "") {
            console.log("Empty Last Name, Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty Last Name"});
        }else if (user.pPassword == "") {
            console.log("Empty Password , Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty Password"});
        }else if (user.pEmail == "") {
            console.log("Empty Email, Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty Email"});
        }
        else{
            console.log("Response Sent: %s", user);
            res.send({'Status':'Success',"Message":"Player has been added successfully","Profile":user});
        }
    });

    
}


//login system for user for Google
exports.loginUserGoogle = function(req, res, next)  {
    var sample = new Player({
        "pFirstName": req.params.pFirstName,
        "pLastName": req.params.pLastName,
        "pEmail": req.params.pEmail,
        "pBirthday": req.params.pBirthday,
        "pPassword": SHA1(req.params.pPassword),
        "pLoginType": req.params.pLoginType,
        "pAuthenticated": req.params.pAuthenticated,
        "pAccountStatus": req.params.pAccountStatus,
        "pAddress": req.params.pAddress,  
        "pGender": req.params.pGender,  
        "pBio": req.params.pBio,
        "pHeight": req.params.pHeight,
        "pWeight": req.params.pWeight,
        "pPhone": req.params.pPhone,
        "pPic": req.params.pPic,
        "pAndroidId": req.params.pAndroidId
    });
    //var encHashCode = SHA1(hashCode);
console.log('Login Resquest Received via Google : ' +  'Email :'+ sample.pEmail);

    Player.findOne({
        "pEmail": sample.pEmail, "pLoginType": sample.pLoginType}, function(err, users) {
        if (err) throw err;
        if (!users) {
            console.log("Email id : "+ sample.pEmail + "Not Found in DB. Hence adding a new record");
            sample.save(function (err) {

                if (err) {
                    res.send({'Status':'Error','Message':err});
                } 
                else{
                    console.log("Adding Player via Google Sign In: " + JSON.stringify(sample));
                    res.send({'Status':'Success',"Message":"Player has been added successfully","Profile":sample});
                    console.log("Google Signup Successful");
                }
            });

          //res.send({Status:'Error', Message: "Authentication failed. User not found."});

        } else if (users) {
        
            res.send({Status:'Success', Message: "Logged In", users});
          
        }
      });
}





//login system for user
exports.loginUser = function(req, res)  {
    var pUsername = req.params.pEmail;
    var hashCode = req.params.pPassword;
    var encHashCode = SHA1(hashCode);
    console.log('Login User Hashcode : ' + hashCode);

    Player.findOne({
        "pEmail": pUsername, 'pPassword': encHashCode}, function(err, user) {
        if (err) throw err;
        if (!user) {
            console.log("Username" + pEmail);
            //console.log("Id" + req.params._id);

          res.send({Status:'Error', Message: "Authentication failed. User not found."});

        } else if (user) {
        
            res.send({Status:'Success', Message: "Logged In", user});
          
        }
      });
}



//Update user by his/her id and requested field.
exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating Player: ' + id);
    console.log(' Player data to be updated: ' + JSON.stringify(user));
    console.log(JSON.stringify(user));

        Player.update({'_id':new ObjectId(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({Status:'Error', Message: "Error while updating User"});
            } else {
                console.log('Player document updated with data ' + JSON.stringify(user));
                res.send({Status:'Success', Message: "Player Updated","Profile": user});
            }
        });
   
}

function SHA1(msg) {
    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };
    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;
        for( i=0; i<=6; i+=2 ) {
        vh = (val>>>(i*4+4))&0x0f;
        vl = (val>>>(i*4))&0x0f;
        str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
    function cvt_hex(val) {
        var str="";
        var i;
        var v;
        for( i=7; i>=0; i-- ) {
        v = (val>>>(i*4))&0x0f;
        str += v.toString(16);
        }
        return str;
    };
    function Utf8Encode(string) {
        
        var regexp3 = /(?:\r\n|\r|\n)/g,
        string= string.replace(regexp3);
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }
    switch( msg_len % 4 ) {
        case 0:
        i = 0x080000000;
        break;
        case 1:
        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;
        case 2:
        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;
        case 3:
        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
        break;
    }
    word_array.push( i );
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
  
    return temp.toLowerCase();
}




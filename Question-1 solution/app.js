const print = (i=10)=>{

        if(i>0){

            console.log(`Star It Ltd.`)
            i = i-1;
            return print(i)
        }


}

print();
export function moneyWithMask (v) {
    var r = v.toString().replace(/\D/g,"");
    var val = "";

    if(r.length > 2){
        r = r[0] === '0' ? r.substring(1, r.length) : r;
        let count = (r.length - 2)/3;
        
        if(count > 1){
            let x = ""
            let m = (r.length - 2)%3;

            if(count >= 2){
                for(let i = 0; i < parseInt(count); i++){
                    x += r.substring((i*3)+m, ((i+1)*3)+m) + '.';
                }  

                x = x[x.length - 1] === '.' ? x.substring(0, x.length-1) : x;
                x = m === 0 ? x + r.substring(r.length - 2, r.length) : r.substring(0, m) + '.' + x  + r.substring(r.length - 2, r.length);
            } else {
                x += r.substring(0, m) + '.' + r.substring(m, r.length)
            }

           val = `${x.substring(0, x.length-2)},${x.substring(x.length-2, x.length)}`;

        } else {
            val = `${r.substring(0, r.length-2)},${r.substring(r.length-2, r.length)}`; 
        }
        
    } else {
        val = `0,${r}`;
    }

    return val;
}
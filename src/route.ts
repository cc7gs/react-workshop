type ObjKey={
    [key:string]:any
}

const files = [
    '01',
    '02',
    // '03',
    // '04',
    // '05',
    // '06',
    // '07',
    // '08',
    // '09',
    // '10-primer',
    // '10',
    // '11',
    // '12',
    // '13',
]

export const pages=files.reduce((p,fileName,index,fullArray)=>{
    const comp=require(`./containers/${fileName}`);
    Object.assign(comp,{
        previous:fullArray[index-1],
        next:fullArray[index+1]
    });
    p[fileName]={
        comp,
        title: comp.default.title,
    }
    return p;
},{} as ObjKey);

export const fileAddTitles = files.map(fileName => ({
    title:pages[fileName].title,
    fileName
}))

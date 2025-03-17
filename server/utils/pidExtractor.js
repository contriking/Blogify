const extractor=(url)=>{
    
    const parts = url.split('/');
    let lastPart = parts[parts.length - 1];

    // Remove the .jpg extension
    const public_ID = lastPart.split('.').slice(0, -1).join('.');
    return public_ID;
}

module.exports={
    extractor
}
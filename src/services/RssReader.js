import React from 'react';
import Parser from "rss-parser";

export default class RssReader {
    url='http://api.aryiaei.com/api/trapp/mag';
    read(onRead){
        let parser = new Parser({
            customFields: {
                item: [
                    ['media:content', 'image'],
                ]
            }
        });
        parser.parseURL(this.url).then((res)=>{
            console.log(res.items);
            onRead(res.items);
            }
        );
    }
}

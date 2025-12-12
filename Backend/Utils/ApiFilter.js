class ApiFilter{
  constructor(query,queryStr){
    this.query=query,
    this.queryStr=queryStr
  }

  //methods
  search(){
    const keyword=this.queryStr.keyword?{
     name:{
      $regex:this.queryStr.keyword,
      $options:'i',
     }
    }:{};

    this.query=this.query.find({...keyword});
    return this;
    
    
  }
  filter(){
    const copyQuerStr={...this.queryStr};
    const removeOther=["page","limit","keyword"];
    removeOther.forEach(key=>delete copyQuerStr[key]);
    this.query=this.query.find(copyQuerStr);
    return this;
  }

  pagination(productPerPage){
    const page=Number(this.queryStr.page)||1;
    const skip=productPerPage*(page-1);
    this.query=this.query.limit(productPerPage).skip(skip);
    return this;

  }
}
module.exports=  {ApiFilter}
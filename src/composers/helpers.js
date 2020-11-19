export function forArg(args, cb){
  for (let i=0; i<args.length; i+=1){
    cb(args[i])
  }
}
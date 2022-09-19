import { motion } from 'framer-motion'

export function Loading () {
    return (
        <div className='loading'>
            <div className='loading-cont'>
                <motion.div initial={{height:'35%'}} animate={{height:'100%'}} transition={{duration:.5, repeat:Infinity, repeatType:'mirror', delay:0}}></motion.div>
                <motion.div initial={{height:'35%'}} animate={{height:'100%'}} transition={{duration:.5, repeat:Infinity, repeatType:'mirror', delay:.25}}></motion.div>
                <motion.div initial={{height:'35%'}} animate={{height:'100%'}} transition={{duration:.5, repeat:Infinity, repeatType:'mirror', delay:.5}}></motion.div>
            </div>
        </div>
    )
}
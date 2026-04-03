# Frame-motion

```typescript
import { motion } from 'framer-motion'

const Basic: React.FC = () => {
    return (
        <>
            <motion.div
                animate={{ x: 100 }}
                transition={{ ease: 'easeOut', duration: 2 }}
                className="w-40 h-40 bg-indigo-500 m-8"
            >
                //Animate
            </motion.div>

            <motion.div whileHover={{ scale: 1.2 }} className="w-40 h-40 bg-indigo-500 m-8">
                //Hover
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="w-40 h-40 bg-indigo-500 m-8"
            >
                //Animate
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
                className="w-40 h-40 bg-indigo-500 m-80"
            />
            //<p className="text-2xl">Scrool</p>

            <div className="bg-green-300 h-auto flex justify-center">
                <motion.div
                    initial={{ x: '-70vh' }}
                    whileInView={{ x: '0%' }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="w-40 h-40 bg-indigo-500 m-36"
                >
                    //Left to center
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: 'spring',
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                    },
                }}
                className="w-40 h-40 bg-indigo-500 m-36"
            >
                //damping
            </motion.div>

            <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: 0.5 }}
                transition={{ duration: 4 }}
                viewport={{ once: true, margin: '-200px' }}
                className="w-40 h-40 bg-indigo-500 m-36"
            >
                //margin: -200px
            </motion.div>
        </>
    )
}
export { Basic }

```

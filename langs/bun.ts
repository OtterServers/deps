import { exec } from 'child_process'

// Get the arguments passed to the script
const args = process.argv.slice(2)

if (args.length === 0) {
    console.error('No arguments provided.')
    process.exit(1)
}

// Check if the first argument is '/mnt/install/install.sh'
if (args[0] === '/mnt/install/install.sh') {
    // Run with bun for JavaScript
    const command = `bun ${args[0]} ${args.slice(1).join(' ')}`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log(stdout)
    })
} else {
    // Otherwise, run with bash
    const command = `${args.join(' ')}`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log(stdout)
    })
}

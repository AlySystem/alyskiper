import { useEffect, useState } from 'react'
import { checkVersion } from 'react-native-check-version'

export const useVersionCode = () => {
    const [updatePending, setUpdatePending] = useState(false)

    useEffect(() => {
        const checkVersionCode = async () => {
            try {
                const version = await checkVersion()
                console.log(version)
                setUpdatePending(version.needsUpdate)
            } catch (error) {
                console.log(error)
                setUpdatePending(false)
            }
        }

        checkVersionCode()
    }, [])

    return { updatePending }
}

export default useVersionCode

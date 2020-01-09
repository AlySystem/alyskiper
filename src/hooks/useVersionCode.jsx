import { useEffect, useState } from 'react'
import { checkVersion } from 'react-native-check-version'

export const useVersionCode = () => {
    const [updatePending, setUpdatePending] = useState(false)

    useEffect(() => {
        const checkVersionCode = async () => {
            const version = await checkVersion()
            console.log(version)
            setUpdatePending(version.needsUpdate)
        }

        checkVersionCode()
    }, [])

    return { updatePending }
}

export default useVersionCode

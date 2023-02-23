import {useNavigate, useLocation} from 'react-router-dom'
import styles from './styles.module.css'
import {useClipboard} from 'use-clipboard-copy'
import { useState } from 'react'

export const MemeGenerated = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const clipboard = useClipboard()
    const url = new URLSearchParams(location.search).get('url')

    const [copied, setCopied] = useState(false)

    const copyLink = () => {
        clipboard.copy(url)
        setCopied(true)
    }

    return (
        <div className= {styles.container}>
            <button onClick = {() => navigate(`/`)}
                className = {styles.home}>
                    Go Back
            </button>
            {url && <img src= {url} />} 

            <button onClick = {copyLink}
                className = {styles.copy}>
                    {copied ? "Link Copied !" : "Copy Link" }
            </button>
        </div>
        )
}
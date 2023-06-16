import { ThreeDots } from  'react-loader-spinner'

export const Loader:React.FC = () => {
    return (
        <ThreeDots 
            height="60" 
            width="100" 
            radius="26"
            color="#7dd3fc" 
            ariaLabel="three-dots-loading"
            visible={true}
        />
    )
}
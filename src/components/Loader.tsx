import { ThreeDots } from  'react-loader-spinner'

export const Loader:React.FC = () => {
    return (
        <ThreeDots 
            height="80" 
            width="140" 
            radius="26"
            color="#7dd3fc" 
            ariaLabel="three-dots-loading"
            visible={true}
        />
    )
}
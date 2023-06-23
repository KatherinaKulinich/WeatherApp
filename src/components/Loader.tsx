import { ThreeDots } from  'react-loader-spinner'

export const Loader:React.FC = () => {
    return (
        <ThreeDots 
            height="30" 
            width="80" 
            radius="16"
            color="#7dd3fc" 
            ariaLabel="three-dots-loading"
            visible={true}
        />
    )
}
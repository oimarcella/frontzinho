import { LoadingStyled, WrapperLoading } from './styles';

export default function Loading() {
	return (
		<WrapperLoading className='d-flex align-items-center justify-content-center'>
			<LoadingStyled />
		</WrapperLoading>
	);
}
import { RootState } from '@/components/Redux/Store';
import { Redirect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const username = useSelector((state: RootState) => state.user.username);

    if (username == null) {
        return <Redirect href={"/(auth)/sign-in"}/>;
    } else {
        return <Redirect href={"/(tabs)/form"} />;
    }
}

export default Home;

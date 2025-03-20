import AppBarTab from "./AppBarTab";

const AuthenticatedBarTab = ({ isAuth, styles }) => {
    if (!isAuth) {
        return (
            <>
                <AppBarTab title="Sign in" link="auth/signin" styles={styles} />
                <AppBarTab title="Sign up" link="auth/signup" styles={styles} />
            </>
        );
    }

    return (
        <>
            <AppBarTab title="Create a review" link="reviews/create" styles={styles} />
            <AppBarTab title="My reviews" link="reviews/user_reviews" styles={styles} />
            <AppBarTab title="Sign out" link="auth/signout" styles={styles} />
        </>
    );
}

export default AuthenticatedBarTab;
import $store from '../store'

export async function initUser(to, from, next) {
    next()
}

/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware(to, from, next) {
    //   const currentUserId = $store.state.user.currentUser.id
    const isAuthRoute = to.matched.some(item => item.meta.isAuth)

    //   if (isAuthRoute && currentUserId) return next()
    //   if (isAuthRoute) return next({ name: 'login' })
    next()
}

export function setPageTitleMiddleware(to, from, next) {
    const pageTitle = to.matched.find(item => item.meta.title)

    if (pageTitle) window.document.title = pageTitle.meta.title
    next()
}

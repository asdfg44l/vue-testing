const marqueeAnimatEnd = function(current, next) {
    current.classList.remove('marquee-active')
    next.classList.add('marquee-active')
}

//看能不能改成訊息一跑完就跑下一個
const excuteMarquee = function(el, binding, vnode) {
    //如果只有一個訊息, 就讓他一直重複就好
    if(vnode.children.length === 1) {
        vnode.children[0].elm.classList.add('marquee-active', 'marquee-infinite')
        return
    }

    vnode.children.forEach((item, index, array) => {
        const currentElm = item.elm;
        const nextElm = index < array.length - 1 ? array[index+1].elm : array[0].elm;
        
        //add first elm as start
        if(index === 0) currentElm.classList.add('marquee-active')
        //event
        currentElm.addEventListener('animationend', () => {
            marqueeAnimatEnd(currentElm, nextElm)
        })
    })
}

export const marquee = {
    inserted(el, binding, vnode) {        
        excuteMarquee(el, binding, vnode)
    }
}
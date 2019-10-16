export default function ({ response: { data: { code, message } } }) {
    const vm = this
    if (Array.isArray(message)) message = message.join('<br/>')
    vm.$awn.alert(message, { labels: { alert: `Error ${code}` } })
}
const colors = ['#2185C5', '#7ECEFD', '#f6d832', '#FF7F66']

export const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}
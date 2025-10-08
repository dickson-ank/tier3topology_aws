import { Paragraph } from "./paragraph"

interface NoteProps {
    Children: React.ReactNode
    grid?: boolean
}

export default function Note({ Children, grid }: NoteProps){
        if (grid){
            return(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6" >
                <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Key things to note in this step</h3>
                    <Paragraph>
                        {Children}
                    </Paragraph>
                </div>
                <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                    <Paragraph>
                        {Children}
                    </Paragraph>
                </div>
            </div>
        )
        }
    return(
        <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Key things to note in this step</h3>
            <Paragraph>
                {Children}
            </Paragraph>
        </div>
    )
}
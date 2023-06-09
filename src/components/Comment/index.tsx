import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Comments } from "../../pages/Product";
import { apiLocal } from "../../services/api";
import { GreyButton, RedButton } from "../Button";

interface CommentProps {
  id: number;
  username: string;
  posted_at: string;
  description: string;
  user_color: string;
  owner_id: number;
  edited: boolean;
  comments: Comments[];
  setComments: (value: Comments[]) => void;
}

export const CommentCard = (commentData: CommentProps) => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    commentData.description
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const editComment = async (data: { description: string }) => {
    if (data.description === "") {
      return;
    }

    try {
      const response = await apiLocal.patch(
        `/comments/${commentData.id}`,
        data
      );

      const filteredComments = commentData.comments.map((comment) => {
        return comment.id === commentData.id
          ? { ...comment, ...response.data }
          : comment;
      });

      commentData.setComments(filteredComments);
      setIsEditing(false);
    } catch (error) {
      console.error();
    }
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);

    setTimeout(() => setConfirmDelete(false), 3000);
  };

  const deleteComment = async () => {
    await apiLocal.delete(`/comments/${commentData.id}`);

    const filteredComments = commentData.comments.filter((comment) => {
      return comment.id !== commentData.id;
    });

    commentData.setComments(filteredComments);
  };

  const getInitials = (name: string) => {
    if (name) {
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else if (names.length > 1) {
        const firstInitial = names[0].charAt(0).toUpperCase();
        const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
      }
    }
    return "";
  };

  const posted = (data: any) => {
    const old = new Date(data).getTime();
    const today = new Date(Date.now()).getTime();

    const year = Math.floor((today - old) / (1000 * 60 * 60 * 24 * 30 * 12));
    const month = Math.floor((today - old) / (1000 * 60 * 60 * 24 * 30));
    const week = Math.floor((today - old) / (1000 * 60 * 60 * 24 * 7));
    const day = Math.floor((today - old) / (1000 * 60 * 60 * 24));
    const hour = Math.floor((today - old) / (1000 * 60 * 60));
    const minute = Math.floor((today - old) / (1000 * 60));
    const sec = Math.floor((today - old) / 1000);

    if (year > 0) {
      if (year == 1) {
        return "1 ano atrás";
      }
      return `${year} anos atrás`;
    }
    if (month > 0) {
      if (month == 1) {
        return "1 mês atrás";
      }
      return `${month} meses atrás`;
    }
    if (week > 0) {
      if (week == 1) {
        return "1 semana atrás";
      }
      return `${week} semanas atrás`;
    }
    if (day > 0) {
      if (day == 1) {
        return "1 dia atrás";
      }
      return `${day} dias atrás`;
    }
    if (hour > 0) {
      if (hour == 1) {
        return "1 hora atrás";
      }
      return `${hour} horas atrás`;
    }
    if (minute > 0) {
      if (minute == 1) {
        return "1 minuto atrás";
      }
      return `${minute} minutos atrás`;
    }
    if (sec > 0) {
      return `${sec} segundos atrás`;
    }

    return "Agora";
  };

  return (
    <li className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2">
        <div
          className="rounded-full w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: commentData.user_color }}
        >
          <span className="text-white font-medium text-[14px]">
            {getInitials(commentData.username)}
          </span>
        </div>
        <span className="text-grey2 font-medium text-[14px] leading-6">
          {commentData.username}
        </span>
        <div className="bg-grey4 w-1 h-1 rounded-full"></div>
        <span className="text-grey3 text-[12px] leading-6 font-normal">
          {`${posted(commentData.posted_at)}`}
        </span>
        {commentData.edited ? (
          <span className="text-[14px] text-grey2">(Editado)</span>
        ) : null}
      </div>
      {isEditing ? (
        <textarea
          className="border-[1.5px] rounded border-grey7 px-4 py-3 min-h-[128px] resize-none"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      ) : (
        <p className="font-normal text-[14px] leading-6 text-grey2">
          {commentData.description}
        </p>
      )}
      {userData.id === commentData.owner_id ? (
        <div className="flex gap-2">
          <GreyButton
            size="medium"
            type="button"
            onClick={() =>
              isEditing
                ? editComment({ description: editedDescription })
                : handleEditClick()
            }
          >
            {isEditing ? "Salvar" : "Editar"}
          </GreyButton>
          <RedButton
            onClick={() =>
              confirmDelete ? deleteComment() : handleDeleteClick()
            }
            size="medium"
            type="button"
          >
            {confirmDelete ? "Clique para confirmar" : "Excluir"}
          </RedButton>
        </div>
      ) : null}
    </li>
  );
};
